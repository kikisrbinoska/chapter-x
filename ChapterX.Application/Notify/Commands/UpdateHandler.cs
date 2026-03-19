using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notify.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly INotifyRepository _notifyRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(INotifyRepository notifyRepository, ILogger<UpdateHandler> logger)
        {
            _notifyRepository = notifyRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var notify = await _notifyRepository.GetByIdAsync(request.Id, cancellationToken);
            if (notify is null)
                return new UpdateResponse(false);

            // No updatable fields on Notify entity

            await _notifyRepository.UpdateAsync(notify, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
