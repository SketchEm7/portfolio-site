from flask import Blueprint, render_template, session,abort

todraw = Blueprint('todraw', __name__)


@todraw.route("/", methods=["GET", "POST"])
def home():
    return '9'




# em.com/todraw => render the react SPA, routing handled by react

# GET  em.com/api/todraw/list/<user_id> => return the list of todraws for the given user id
# POST em.com/api/todraw/list/<user_id> => add an item to the list for the given user id
    # { "todraw":
#