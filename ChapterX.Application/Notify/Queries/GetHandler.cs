using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Notify.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly INotifyRepository _notifyRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(INotifyRepository notifyRepository, ILogger<GetHandler> logger)
        {
            _notifyRepository = notifyRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var notify = await _notifyRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(notify);
        }
    }
}
