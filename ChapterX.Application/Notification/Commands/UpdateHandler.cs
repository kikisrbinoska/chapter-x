using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notification.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(INotificationRepository notificationRepository, ILogger<UpdateHandler> logger)
        {
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var notification = await _notificationRepository.GetByIdAsync(request.Id, cancellationToken);
            if (notification is null)
                return new UpdateResponse(false);

            notification.Content = request.Content;
            notification.IsRead = request.IsRead;

            await _notificationRepository.UpdateAsync(notification, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
