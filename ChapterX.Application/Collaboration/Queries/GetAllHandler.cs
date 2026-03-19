using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Collaboration.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(ICollaborationRepository collaborationRepository, ILogger<GetAllHandler> logger)
        {
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var collaborations = await _collaborationRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(collaborations);
        }
    }
}
