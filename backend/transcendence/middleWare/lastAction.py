
from transcendence.models import CustomUser


class LastAction:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if isinstance(request.user, CustomUser) and request.user.is_authenticated:
            request.user.updateLastAction()
        return self.get_response(request)
