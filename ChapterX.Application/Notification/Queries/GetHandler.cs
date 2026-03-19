using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notification.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(INotificationRepository notificationRepository, ILogger<GetHandler> logger)
        {
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var notification = await _notificationRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(notification);
        }
    }
}
