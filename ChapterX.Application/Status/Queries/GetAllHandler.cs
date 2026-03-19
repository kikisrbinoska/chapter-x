using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Status.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IStatusRepository _statusRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IStatusRepository statusRepository, ILogger<GetAllHandler> logger)
        {
            _statusRepository = statusRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var statuses = await _statusRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(statuses);
        }
    }
}
