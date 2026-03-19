using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Collaboration.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(ICollaborationRepository collaborationRepository, ILogger<GetHandler> logger)
        {
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var collaboration = await _collaborationRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(collaboration);
        }
    }
}
