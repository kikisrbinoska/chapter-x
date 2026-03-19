using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Genre.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IGenreRepository genreRepository, ILogger<UpdateHandler> logger)
        {
            _genreRepository = genreRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var genre = await _genreRepository.GetByIdAsync(request.Id, cancellationToken);
            if (genre is null)
                return new UpdateResponse(false);

            genre.Name = request.Name;

            await _genreRepository.UpdateAsync(genre, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
