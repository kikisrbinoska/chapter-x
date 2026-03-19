using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notify.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly INotifyRepository _notifyRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(INotifyRepository notifyRepository, ILogger<DeleteHandler> logger)
        {
            _notifyRepository = notifyRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var notify = await _notifyRepository.GetByIdAsync(request.Id, cancellationToken);
            if (notify is null)
                return new DeleteResponse(false);

            await _notifyRepository.DeleteAsync(notify, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
