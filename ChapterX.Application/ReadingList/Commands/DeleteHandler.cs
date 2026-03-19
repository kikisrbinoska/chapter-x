using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingList.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IReadingListRepository readingListRepository, ILogger<DeleteHandler> logger)
        {
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var readingList = await _readingListRepository.GetByIdAsync(request.Id, cancellationToken);
            if (readingList is null)
                return new DeleteResponse(false);

            await _readingListRepository.DeleteAsync(readingList, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
