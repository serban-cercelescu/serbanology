import functools
import json
import time
import os

from flask import Flask, request, Response, send_from_directory
from ArticleParser import tex_tag_parser
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Article API
def is_safe_path(path, follow_symlinks=True):
    basedir = os.getcwd()
    if follow_symlinks:
        return os.path.realpath(path).startswith(basedir)
    return os.path.abspath(path).startswith(basedir)


@app.route('/api/list_articles')
def list_articles():
    res = {}
    for filename in os.listdir('./articles'):
        if filename[0] != '.':
            with open("./articles/" + filename + "/meta.json") as f:
                metadata = f.read()

                tdict = json.loads(metadata)
                if tdict['visible'] != False:
                    res[filename] = metadata
    return res

@app.route('/api/content_article')
def content_article():
    path = "./articles/" + request.args.get('art') + "/content.jsx"
    if not is_safe_path(path):
        return "forbidden", 403
    try:
        with open(path) as f:
            return {"text": tex_tag_parser(f.read())}, 200
    except:
        return "Not found", 404

@app.route('/api/meta_article')
def meta_article():
    path = "./articles/" + request.args.get('art') + "/meta.json"
    if not is_safe_path(path):
        return "forbidden", 403
    try:
        with open(path) as f:
            return f.read(), 200
    except:
        return "Not found", 404

@app.errorhandler(404)
def not_found(e):
    print(os.getcwd())
    return send_from_directory('build', 'index.html')