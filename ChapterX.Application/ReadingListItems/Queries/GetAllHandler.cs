using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingListItems.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IReadingListItemsRepository _readingListItemsRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IReadingListItemsRepository readingListItemsRepository, ILogger<GetAllHandler> logger)
        {
            _readingListItemsRepository = readingListItemsRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var readingListItems = await _readingListItemsRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(readingListItems);
        }
    }
}
