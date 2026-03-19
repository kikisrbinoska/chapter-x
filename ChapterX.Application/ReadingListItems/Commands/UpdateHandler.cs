using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IReadingListItemsRepository _readingListItemsRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IReadingListItemsRepository readingListItemsRepository, ILogger<UpdateHandler> logger)
        {
            _readingListItemsRepository = readingListItemsRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var readingListItems = await _readingListItemsRepository.GetByIdAsync(request.Id, cancellationToken);
            if (readingListItems is null)
                return new UpdateResponse(false);

            readingListItems.ListId = request.ReadingListId;
            readingListItems.StoryId = request.StoryId;

            await _readingListItemsRepository.UpdateAsync(readingListItems, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
