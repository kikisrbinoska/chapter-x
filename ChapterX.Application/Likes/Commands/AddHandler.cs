using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Likes.Commands
{
    public class AddHandler : IRequestHandler<AddRequest, AddResponse>
    {
        private readonly ILikesRepository _likesRepository;
        private readonly ILogger<AddHandler> _logger;

        public AddHandler(ILikesRepository likesRepository, ILogger<AddHandler> logger)
        {
            _likesRepository = likesRepository;
            _logger = logger;
        }

        public async Task<AddResponse> Handle(AddRequest request, CancellationToken cancellationToken)
        {
            var like = new Domain.Entities.Likes
            {
                UserId = request.UserId,
                StoryId = request.ChapterId,
                CreatedAt = DateTime.UtcNow
            };

            await _likesRepository.AddAsync(like, cancellationToken);

            return new AddResponse(like.Id);
        }
    }
}
