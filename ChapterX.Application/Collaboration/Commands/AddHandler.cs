using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Collaboration.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly ICollaborationRepository _collaborationRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(ICollaborationRepository collaborationRepository, ILogger<AddHandler> logger)
        {
            _collaborationRepository = collaborationRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var collaboration = new Domain.Entities.Collaboration
            {
                UserId = request.UserId,
                StoryId = request.StoryId,
                CreatedAt = DateTime.UtcNow
            };

            await _collaborationRepository.AddAsync(collaboration, cancellationToken);

            return new AddResponse(collaboration.Id);
        }
    }
}
