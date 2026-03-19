using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Writer.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IWriterRepository _writerRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IWriterRepository writerRepository, ILogger<GetAllHandler> logger)
        {
            _writerRepository = writerRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var writers = await _writerRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(writers);
        }
    }
}
