from flask import Blueprint, render_template, session,abort

todraw = Blueprint('todraw', __name__)
@todraw.route("/")
def hello():
    return "Hello World from todo draw!"