using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notification.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(INotificationRepository notificationRepository, ILogger<GetAllHandler> logger)
        {
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var notifications = await _notificationRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(notifications);
        }
    }
}
