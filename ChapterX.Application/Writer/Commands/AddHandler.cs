using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Writer.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IWriterRepository _writerRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IWriterRepository writerRepository, ILogger<AddHandler> logger)
        {
            _writerRepository = writerRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var writer = new Domain.Entities.Writer
            {
                Id = request.UserId
            };

            await _writerRepository.AddAsync(writer, cancellationToken);

            return new AddResponse(writer.Id);
        }
    }
}
