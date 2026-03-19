using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Collaboration.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(ICollaborationRepository collaborationRepository, ILogger<UpdateHandler> logger)
        {
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var collaboration = await _collaborationRepository.GetByIdAsync(request.Id, cancellationToken);
            if (collaboration is null)
                return new UpdateResponse(false);

            // No updatable fields on Collaboration entity

            await _collaborationRepository.UpdateAsync(collaboration, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
