using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Genre.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IGenreRepository _genreRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IGenreRepository genreRepository, ILogger<AddHandler> logger)
        {
            _genreRepository = genreRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var genre = new Domain.Entities.Genre
            {
                Name = request.Name
            };

            await _genreRepository.AddAsync(genre, cancellationToken);

            return new AddResponse(genre.Id);
        }
    }
}
