using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingList.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IReadingListRepository readingListRepository, ILogger<GetAllHandler> logger)
        {
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var readingLists = await _readingListRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(readingLists);
        }
    }
}
