using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.HasGenre.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IHasGenreRepository _hasGenreRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IHasGenreRepository hasGenreRepository, ILogger<UpdateHandler> logger)
        {
            _hasGenreRepository = hasGenreRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var hasGenre = await _hasGenreRepository.GetByIdAsync(request.Id, cancellationToken);
            if (hasGenre is null)
                return new UpdateResponse(false);

            hasGenre.StoryId = request.StoryId;
            hasGenre.GenreId = request.GenreId;

            await _hasGenreRepository.UpdateAsync(hasGenre, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
