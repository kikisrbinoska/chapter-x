using MediatR;

namespace ChapterX.Application.Likes.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
