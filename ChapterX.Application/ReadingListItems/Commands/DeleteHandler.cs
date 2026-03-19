using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IReadingListItemsRepository _readingListItemsRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IReadingListItemsRepository readingListItemsRepository, ILogger<DeleteHandler> logger)
        {
            _readingListItemsRepository = readingListItemsRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var readingListItems = await _readingListItemsRepository.GetByIdAsync(request.Id, cancellationToken);
            if (readingListItems is null)
                return new DeleteResponse(false);

            await _readingListItemsRepository.DeleteAsync(readingListItems, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
