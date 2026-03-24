using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Story.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IGenreRepository _genreRepository;
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IStoryRepository storyRepository, IGenreRepository genreRepository, IHasGenreRepository hasGenreRepository, ILogger<AddHandler> logger)
        {
            _storyRepository = storyRepository;
            _genreRepository = genreRepository;
            _hasGenreRepository = hasGenreRepository;
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

            foreach (var genreName in request.Genres ?? [])
            {
                var genre = await _genreRepository.GetByNameAsync(genreName, cancellationToken);
                if (genre == null) continue;
                await _hasGenreRepository.AddAsync(new Domain.Entities.HasGenre { StoryId = story.Id, GenreId = genre.Id }, cancellationToken);
            }

            return new AddResponse(story.Id);
        }
    }
}
