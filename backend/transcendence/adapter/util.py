import json


def checkForCredentials(request) :
    try:
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
    except (KeyError, json.JSONDecodeError):
        return None
    if password is None:
        return None

    if email is None:
        return None
    return email, password