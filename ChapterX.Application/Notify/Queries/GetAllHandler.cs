using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notify.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly INotifyRepository _notifyRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(INotifyRepository notifyRepository, ILogger<GetAllHandler> logger)
        {
            _notifyRepository = notifyRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var notifies = await _notifyRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(notifies);
        }
    }
}
