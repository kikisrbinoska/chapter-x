using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IReadingListItemsRepository _readingListItemsRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IReadingListItemsRepository readingListItemsRepository, ILogger<AddHandler> logger)
        {
            _readingListItemsRepository = readingListItemsRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var exists = await _readingListItemsRepository.ExistsAsync(request.ReadingListId, request.StoryId, cancellationToken);
            if (exists)
                throw new InvalidOperationException("Story is already in this reading list.");

            var readingListItems = new Domain.Entities.ReadingListItems
            {
                ListId = request.ReadingListId,
                StoryId = request.StoryId,
                AddedAt = DateTime.UtcNow
            };

            await _readingListItemsRepository.AddAsync(readingListItems, cancellationToken);

            return new AddResponse(readingListItems.Id);
        }
    }
}
