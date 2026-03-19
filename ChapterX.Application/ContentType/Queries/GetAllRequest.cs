using MediatR;

namespace ChapterX.Application.ContentType.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
