using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Status.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IStatusRepository _statusRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IStatusRepository statusRepository, ILogger<GetHandler> logger)
        {
            _statusRepository = statusRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var status = await _statusRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(status);
        }
    }
}
