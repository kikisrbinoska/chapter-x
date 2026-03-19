using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Writer.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IWriterRepository _writerRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IWriterRepository writerRepository, ILogger<GetHandler> logger)
        {
            _writerRepository = writerRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var writer = await _writerRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(writer);
        }
    }
}
