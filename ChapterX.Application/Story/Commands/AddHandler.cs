using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IStoryRepository storyRepository, ILogger<AddHandler> logger)
        {
            _storyRepository = storyRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var story = new Domain.Entities.Story
            {
                MatureContent = request.MatureContent,
                ShortDescription = request.ShortDescription,
                Image = request.Image,
                Content = request.Content,
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _storyRepository.AddAsync(story, cancellationToken);

            return new AddResponse(story.Id);
        }
    }
}
