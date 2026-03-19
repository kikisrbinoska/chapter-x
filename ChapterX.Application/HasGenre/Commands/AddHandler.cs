using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.HasGenre.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IHasGenreRepository hasGenreRepository, ILogger<AddHandler> logger)
        {
            _hasGenreRepository = hasGenreRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var hasGenre = new Domain.Entities.HasGenre
            {
                StoryId = request.StoryId,
                GenreId = request.GenreId
            };

            await _hasGenreRepository.AddAsync(hasGenre, cancellationToken);

            return new AddResponse(hasGenre.Id);
        }
    }
}
