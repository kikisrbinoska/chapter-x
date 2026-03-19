using MediatR;

namespace ChapterX.Application.Likes.Commands
{
    public record UpdateRequest(int Id, int UserId, int ChapterId) : IRequest<UpdateResponse>;
}
