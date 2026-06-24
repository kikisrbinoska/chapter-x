using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IStoryRepository storyRepository, ILogger<UpdateHandler> logger)
        {
            _storyRepository = storyRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var story = await _storyRepository.GetByIdAsync(request.Id, cancellationToken);
            if (story is null)
                return new UpdateResponse(false);

            if (story.UserId != request.CallerId)
                throw new UnauthorizedAccessException("You do not own this story.");

            story.MatureContent = request.MatureContent;
            story.Title = request.Title;
            story.ShortDescription = request.ShortDescription;
            story.Image = request.Image;
            story.Content = request.Content;
            story.UpdatedAt = DateTime.UtcNow;

            await _storyRepository.UpdateAsync(story, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
