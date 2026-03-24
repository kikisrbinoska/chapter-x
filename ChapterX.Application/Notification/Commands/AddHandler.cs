using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notification.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(INotificationRepository notificationRepository, ILogger<AddHandler> logger)
        {
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var notification = new Domain.Entities.Notification
            {
                Content = request.Content,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                RecipientUserId = request.RecipientUserId,
                Type = request.Type,
                Link = request.Link,
            };

            await _notificationRepository.AddAsync(notification, cancellationToken);

            return new AddResponse(notification.Id);
        }
    }
}
