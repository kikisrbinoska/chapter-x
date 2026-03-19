using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Collaboration.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(ICollaborationRepository collaborationRepository, ILogger<DeleteHandler> logger)
        {
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var collaboration = await _collaborationRepository.GetByIdAsync(request.Id, cancellationToken);
            if (collaboration is null)
                return new DeleteResponse(false);

            await _collaborationRepository.DeleteAsync(collaboration, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
