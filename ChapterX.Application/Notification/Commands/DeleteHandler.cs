using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notification.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(INotificationRepository notificationRepository, ILogger<DeleteHandler> logger)
        {
            _notificationRepository = notificationRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var notification = await _notificationRepository.GetByIdAsync(request.Id, cancellationToken);
            if (notification is null)
                return new DeleteResponse(false);

            await _notificationRepository.DeleteAsync(notification, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
