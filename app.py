from flask import Flask, render_template
from data import portfolio_data

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', data=portfolio_data)

@app.route('/about/')
def about():
    return render_template('about.html', data=portfolio_data)

@app.route('/skills/')
def skills():
    return render_template('skills.html', data=portfolio_data)

@app.route('/projects/')
def projects():
    return render_template('projects.html', data=portfolio_data)

@app.route('/project/<project_id>/')
def project_details(project_id):
    project = next((p for p in portfolio_data['projects'] if p['id'] == project_id), None)
    if project:
        return render_template('project_details.html', project=project)
    return "Project not found", 404

@app.route('/contact/')
def contact():
    return render_template('contact.html', data=portfolio_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
