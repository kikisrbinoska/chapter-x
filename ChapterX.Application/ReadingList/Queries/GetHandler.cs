using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingList.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IReadingListRepository readingListRepository, ILogger<GetHandler> logger)
        {
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var readingList = await _readingListRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(readingList);
        }
    }
}
