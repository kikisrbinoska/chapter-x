using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Chapter.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(IChapterRepository chapterRepository, ILogger<AddHandler> logger)
        {
            _chapterRepository = chapterRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var chapter = new Domain.Entities.Chapter
            {
                Number = request.Number,
                Name = request.Name,
                Title = request.Title,
                Content = request.Content,
                StoryId = request.StoryId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                PublishedAt = DateTime.UtcNow
            };

            await _chapterRepository.AddAsync(chapter, cancellationToken);

            return new AddResponse(chapter.Id);
        }
    }
}
