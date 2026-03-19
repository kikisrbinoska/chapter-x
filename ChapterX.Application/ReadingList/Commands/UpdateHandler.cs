using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingList.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IReadingListRepository readingListRepository, ILogger<UpdateHandler> logger)
        {
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var readingList = await _readingListRepository.GetByIdAsync(request.Id, cancellationToken);
            if (readingList is null)
                return new UpdateResponse(false);

            readingList.Name = request.Name;
            readingList.Content = request.Content;
            readingList.IsPublic = request.IsPublic;

            await _readingListRepository.UpdateAsync(readingList, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
