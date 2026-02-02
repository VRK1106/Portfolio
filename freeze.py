from flask_frozen import Freezer
from app import app
from data import portfolio_data

# Configure Freezer
# We'll build to a folder named 'build' for clarity
app.config['FREEZER_DESTINATION'] = 'build'
# Remove existing build files to ensure clean state
app.config['FREEZER_REMOVE_EXTRA_FILES'] = True

freezer = Freezer(app)

@freezer.register_generator
def project_details():
    for project in portfolio_data['projects']:
        yield {'project_id': project['id']}

if __name__ == '__main__':
    freezer.freeze()
    print("Static site generated in 'build/' folder.")
