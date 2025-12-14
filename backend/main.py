from typing import List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[dict] = None


class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    indegree = {node.id: 0 for node in nodes}
    adjacency = {node.id: [] for node in nodes}

    for edge in edges:
        if edge.target not in indegree or edge.source not in indegree:
            # Unknown node references break DAG validity
            return False
        indegree[edge.target] += 1
        adjacency[edge.source].append(edge.target)

    queue = [node_id for node_id, deg in indegree.items() if deg == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1
        for neighbor in adjacency[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": dag}
