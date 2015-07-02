#install mongodb from mongo's site
#pip install pymongo
#pip install flask

#!flask/bin/python
from flask import Flask, jsonify,request,abort,Response
from config import config
from bson.json_util import dumps,loads
from dao import *
#from crossdomain import *
import simplejson
import os.path
from generatorHasher import *

app = Flask(__name__)



def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)


@app.route('/', methods=['GET'])
def index():  # pragma: no cover
    content = get_file('index.html')
    return Response(content, mimetype="text/html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_resource(path):  # pragma: no cover
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
    }
    complete_path = os.path.join(root_dir(), path)
    ext = os.path.splitext(path)[1]
    mimetype = mimetypes.get(ext, "text/html")
    content = get_file(complete_path)
    return Response(content, mimetype=mimetype)



@app.route('/api/units', methods=['GET'])
def get_units(unit_id=None):
    return get_unit()
@app.route('/api/units/<int:unit_id>', methods=['GET'])
def get_unit(unit_id=None):
    _dao = dao()
    #unit = [unit for unit in units if unit['id'] == unit_id]
    if(unit_id==None):
        return dumps(_dao.read_all())
    else:
        unit =  _dao.read_one(unit_id)
        if (unit == None):
            return "invalid",500
        else:
            return dumps(unit)#jsonify({'unit':unit})
    
@app.route('/api/units/create', methods=['POST','GET','OPTIONS'])
def create_or_update_unit():
    print "Method has been reached "
    print request.args
    print request.values
    print request.stream
    print request.data
    print request.method
    print request.path
    print request.url
    print request.is_xhr
    print request.json
    unit = simplejson.loads(request.data)

    print "1"
    if not unit:
        abort(400)
    _dao = dao()
    
    print "2"
    tmpunit = _dao.read_one(unit['id'])

    print "3"
    if(tmpunit == None):
        print "creating"
        _dao.create_one(unit)
    else:
        print "updating"
        _dao.update_one(unit)
    
    print "4"
    return str(unit),201




#### End user page

@app.route('/enduser', methods=['GET'])
@app.route('/enduser<args>')
def enduser(args=""):  # pragma: no cover
    content = get_file('end_user.html'+args)
    return Response(content, mimetype="text/html")


### Admin Bulk Survey Generator/Hasher
# @app.route('/api/generate/<int:surveyTemplateID>/<int:num_of_surveys>', methods=['GET'])
# def get_surveys(surveyTemplateID="0", num_of_surveys=0):
#     generatorHasher.main(surveyTemplateID, num_of_surveys)
#     return dumps("Complete")
    






#### Attempt at flexible DAO

@app.route('/api/read/<collection_id>', methods=['GET'])
def get_surveys(collection_id="units", unit_id=None):
    return get_survey(collection_id)

@app.route('/api/read/<collection_id>/<unit_id>', methods=['GET'])
def get_survey(collection_id="units", unit_id=None):
    _dao = dao_flex(collection_id)

    #unit = [unit for unit in units if unit['id'] == unit_id]
    if(unit_id==None):
        return dumps(_dao.read_all())
    else:
        unit =  _dao.read_one(unit_id)
        if (unit == None):
            return "invalid",500
        else:
            return dumps(unit)#jsonify({'unit':unit})

@app.route('/api/create/<collection_id>', methods=['POST','GET','OPTIONS'])
def create_or_update_record(collection_id="units"):

    ### Debug Data Pull from AJAX Call
    # print "Method has been reached "
    # print request.args
    # print request.values
    # print request.stream
    # print request.data
    # print request.method
    # print request.path
    # print request.url
    # print request.is_xhr
    # print request.json

    unit = simplejson.loads(request.data)

    #print "1"
    if not unit:
        abort(400)
    _dao = dao_flex(collection_id)
    
    #print "2"
    tmpunit = _dao.read_one(unit['id'])

    #print "3"
    if(tmpunit == None):
        print "creating"
        _dao.create_one(unit)
    else:
        print "updating"
        _dao.update_one(unit)
    
    #print "4"
    return str(unit),201


@app.route('/api/max_id/<collection_id>', methods=['GET'])
def get_max_id(collection_id="units"):
    print ("Entering Get Max ID method")
    _dao = dao_flex(collection_id)
    maxID = _dao.getMaxID()
    print ("Get Max ID = ", maxID)
    return dumps(maxID)


@app.route('/api/delete/<collection_id>/<unit_id>', methods=['GET'])
def delete_id(collection_id="units", unit_id=None):
    _dao = dao_flex(collection_id)
    _dao.delete_one(unit_id)
    return dumps("Deletion Complete")







# #### Attempt at Login Control

# @login_manager.user_loader
# def load_user(userid):
#     return User.get(userid)


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     # Here we use a class of some kind to represent and validate our
#     # client-side form data. For example, WTForms is a library that will
#     # handle this for us.
#     form = LoginForm()
#     if form.validate_on_submit():
#         # Login and validate the user.
#         login_user(user)

#         flask.flash('Logged in successfully.')

#         next = flask.request.args.get('next')
#         if not next_is_valid(next):
#             return flask.abort(400)

#         return flask.redirect(next or flask.url_for('index'))
#     return flask.render_template('login.html', form=form)






           
if __name__ == '__main__':#initalizes main program
    app.run(debug=True,host="0.0.0.0")#calls app.
    
    