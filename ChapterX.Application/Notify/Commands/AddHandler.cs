using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notify.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly INotifyRepository _notifyRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(INotifyRepository notifyRepository, ILogger<AddHandler> logger)
        {
            _notifyRepository = notifyRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var notify = new Domain.Entities.Notify
            {
                UserId = request.UserId,
                NotificationId = request.NotificationId
            };

            await _notifyRepository.AddAsync(notify, cancellationToken);

            return new AddResponse(notify.Id);
        }
    }
}
