import functools
import json
import time
import os
import obsidiantools.api as otools

from flask import Flask, request, Response, send_from_directory
from flask_cors import CORS

vault = otools.Vault('./vault').connect().gather()
vault_id = {}
id_vault = {}

app = Flask(__name__)
CORS(app)

# Article API
def is_safe_path(path, follow_symlinks=True):
    basedir = os.getcwd()
    if follow_symlinks:
        return os.path.realpath(path).startswith(basedir)
    return os.path.abspath(path).startswith(basedir)


@app.route('/api/get_article/<art>')
def content_article(art):
    path = "./vault/" + art + ".md"

    if not is_safe_path(path):
        return "forbidden", 403
    try:
        with open(path) as f:
            return {"text": f.read()}, 200
    except:
        with open('./vault/404.md') as f:
            return {"text": f.read()}, 404

@app.route('/api/get_graph')
def get_graph():
    global vault, vault_id, id_vault

    vault_nodes = [ {'name': node, 'id': str(vault_id[node]), 'val': 10} for node in vault.graph.nodes() ]
    vault_links = [ {'source': str(vault_id[src]), 'target': str(vault_id[trg])} for (src, trg) in vault.graph.edges() ]

    return {
        'nodes': vault_nodes,
        'links': vault_links
    }, 200

@app.route('/api/get_list')
def get_links():
    global vault, vault_id, id_vault
    return list(vault.graph.nodes()), 200

@app.errorhandler(404)
def not_found(e):
    print(os.getcwd())
    return send_from_directory('static', 'index.html')

def initialize():
    global vault, vault_id, id_vault
    idx = 0
    for page in vault.graph.nodes():
        idx+= 1
        vault_id[page] = idx
        id_vault[idx] = page


initialize()
