using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ReadingList.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IReadingListRepository _readingListRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IReadingListRepository readingListRepository, ILogger<AddHandler> logger)
        {
            _readingListRepository = readingListRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var readingList = new Domain.Entities.ReadingList
            {
                Name = request.Name,
                Content = request.Content,
                IsPublic = request.IsPublic,
                UserId = request.UserId
            };

            await _readingListRepository.AddAsync(readingList, cancellationToken);

            return new AddResponse(readingList.Id);
        }
    }
}
