using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IStoryRepository storyRepository, ILogger<DeleteHandler> logger)
        {
            _storyRepository = storyRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var story = await _storyRepository.GetByIdAsync(request.Id, cancellationToken);
            if (story is null)
                return new DeleteResponse(false);

            if (!request.IsAdmin && story.UserId != request.CallerId)
                throw new UnauthorizedAccessException("You do not own this story.");

            await _storyRepository.DeleteAsync(story, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
