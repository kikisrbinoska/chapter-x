using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingListItems.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IReadingListItemsRepository _readingListItemsRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IReadingListItemsRepository readingListItemsRepository, ILogger<GetHandler> logger)
        {
            _readingListItemsRepository = readingListItemsRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var readingListItems = await _readingListItemsRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(readingListItems);
        }
    }
}
